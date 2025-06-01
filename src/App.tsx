import { ExpandMore, Info, Search } from '@mui/icons-material';
import { AccordionDetails, Accordion, AccordionSummary, Alert, AppBar, Autocomplete, Box, Card, CardContent, CardMedia, Chip, Container, InputAdornment, Slider, TextField, Toolbar, Typography, useMediaQuery, List, ListItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import data from './assets/data.json';

interface Corso {
  image: string;
  titolo: string;
  descrizione: string;
  specialita: string[];
  anni: number[];
  partecipanti: {
    min: number;
    max: number;
  };
  nuovo: boolean;
}

interface Base {
  nome: string;
  titolo: string;
  image: string;
  corsi: Corso[];
}

function App() {
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedAnno, setSelectedAnno] = useState<number[]>([1,4]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Base[]>(data);
  const isSmall = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    let filtered = data;

    // Filter by base
    if (selectedBase) {
      filtered = filtered.filter(base => base.nome === selectedBase);
    }

    // Filter by anno
    if (selectedAnno) {
      filtered = filtered.map(base => ({
        ...base,
        corsi: base.corsi.filter(corso => corso.anni.some(anno => anno >= selectedAnno[0] && anno <= selectedAnno[1]))
      })).filter(base => base.corsi.length > 0);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map(base => ({
        ...base,
        corsi: base.corsi.filter(corso => 
          corso.titolo.toLowerCase().includes(query)
        )
      })).filter(base => base.corsi.length > 0);
    }

    setFilteredData(filtered);
  }, [selectedBase, selectedAnno, searchQuery]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Tecnicamp 2025</Typography>
        </Toolbar>
        <Box bgcolor="background.paper" p={2} pr={4}>
          <TextField
            label="Cerca"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            fullWidth
            size='small'
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }}
          />
          <Box display="flex" alignItems="center" gap={2}>
            <Autocomplete 
              size='small'
              value={{value:selectedBase, label: selectedBase}}
              onChange={(_, value) => setSelectedBase(value?.value || '')}
              fullWidth
              renderInput={params => <TextField {...params} label="Base" />} 
              options={data.map(base => ({label: base.titolo, value: base.nome}))}
            />
            <Box sx={{width: '90%', px: 4}}>
              <Slider
                getAriaLabel={() => 'Anno'}
                value={selectedAnno}
                onChange={(_, value) => setSelectedAnno(value as number[])}
                valueLabelDisplay="off"
                getAriaValueText={anno => anno.toString()}
              min={1}
              max={4}
              step={1}
              marks={[{value: 1, label: '1° anno'}, {value: 4, label: '4°'}]}
              size='small'
            />
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box display="flex" flexDirection="column" gap={2} width="100%" mx={0}>
          <Container sx={{py: 2}}>
            <Alert icon={<Info fontSize="inherit" />} severity="info">
              Le iscrizioni apriranno <strong>domenica 1 giugno alle 12:00</strong> e resteranno aperte fino al <strong>30 giugno</strong>.
            </Alert>
            <Typography variant="body1" sx={{my: 2}}>
              Il <strong>Tecnicamp</strong> è un’Attività Nazionale della Branca <strong>Esploratori ed Esploratrici</strong>: sviluppato in più basi scout in tutta Italia, permette ad esploratrici ed esploratori di migliorare la propria conoscenza delle tecniche scout e di sperimentarne di nuove.
              <br />
              Edizione 2025: <strong>6 basi</strong> Tecnicamp lungo tutto il territorio italiano, sempre più strutturate nelle proposte e nelle tecniche per cercare di arrivare a tutti e tutte. Inoltre da quest’anno, le nostre basi saranno caratterizzate da un nome che sia per loro unico ed evocativo, con un pizzico di tecnica ma anche di sogni, aiutandoci a dare ulteriore <strong>slancio</strong> a questo fantastico evento nazionale: soffiano i <strong>Venti</strong> dell’avventura!
              <br />
              Da quale vi lascerete rapire?
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, my: 2, justifyContent: 'center'}}>
              <Button variant="contained" color="primary" href="https://app.cngei.it">
                Accedi al portale
              </Button>
              <Button variant="outlined" href="https://help.cngei.it/servicedesk/customer/portal/4">
                Richieste di assistenza
              </Button>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span">Come posso pagare la quota di iscrizione?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Hai 3 possibilità:
                <List>
                  <ListItem>1. Bonifico cumulativo da parte della tua sezione</ListItem>
                  <ListItem>2. Pagare tramite bonifico bancario</ListItem>
                  <ListItem>3. Pagare tramite PayPal</ListItem>
                </List>
                L'iscrizione è confermata solo dopo il pagamento, consigliamo di pagare il più presto possibile per evitare che terminino i posti per il corso scelto.
                <Typography variant="body2">
                  INTESTAZIONE: CNGEI<br/>
                  IBAN: IT 23 Z 06230 03205 000040421938<br/>
                  CAUSALE BONIFICO: “Tecnicamp 2025 - Sezione – Nome e Cognome esploratore” (es. Tecnicamp 2025 - Aosta – Mario Rossi)
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span"> Non riesco ad accedere al portale. Non mi arriva nessuna email per l’accesso. Che cosa devo fare? </Typography>
              </AccordionSummary>
              <AccordionDetails>
              Contatta subito il tuo Capo Reparto e chiedigli di verificare se la mail indicata nella tua anagrafica presente app.cngei.it è corretta, facendo attenzione ad eventuali spazi bianchi o punti inseriti nel campo.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span">Ho un problema tecnico</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Clicca il pulsante <strong>Richieste di assistenza</strong> in alto e segui le istruzioni. <strong>Se e solo se</strong> non riesci a creare un ticket, contattaci all'indirizzo help@cngei.it
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span">Il corso che volevo fare è già completo. Posso mettermi in lista di attesa?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              La lista di attesa non esiste. Non scoraggiarti, non ti resta che iscriverti ad un altro corso Tecnicamp. Siamo sicuri che saprai scegliere una valida alternativa tra le numerose proposte. Puoi comunque indicare nel modulo il corso “desiderato” che risulta però completo; se dovesse liberarsi un posto, terremo conto del tuo desiderio.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span">Devo modificare il contenuto della mia iscrizione. Cosa faccio?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              Non è possibile modificare il contenuto in autonomia. Apri un ticket di assistenza spiegando le modifiche da fare.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography component="span">Ho cambiato idea e voglio cambiare la scelta del corso</Typography>
              </AccordionSummary>
              <AccordionDetails>
              Se vuoi cambiare corso, prova a scriverci la tua nuova scelta. Non assicuriamo di riuscire ad accontentarti, ma proveremo a vedere se ci sono ancora posti liberi nel nuovo corso e ti daremo una risposta.
  Se invece vuoi scambiare il corso con un altro esplo del tuo reparto (e siete entrambə d’accordo), chiedi al tuo Capo Reparto di aprire un ticket per richiedere lo scambio.
              </AccordionDetails>
            </Accordion>
          </Container>
          {filteredData.map(base => (
            <Box key={base.nome} sx={{display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), url(/assets/${base.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '250px', 
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'start',
                  px: 4,
                  py: 2
                }}>
                  <Typography sx={{color: 'white', fontSize: '2rem', fontWeight: 'bold'}}>{base.titolo}</Typography>
                </Box>
                <Box sx={{maxWidth: 'max(700px, 80%)', display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: isSmall ? '1fr' : 'repeat(auto-fill, minmax(40%, 1fr))', gap: 2, mx: 2, my: 2}}>
                  {base.corsi.map(corso => (
                    <Card key={corso.titolo} sx={{height: '100%'}}> 
                      <CardMedia
                        component="img"
                        sx={{height: '200px'}}
                        image={`/assets/${base.nome}/${corso.image}`}
                        alt={corso.titolo}
                      />
                      <CardContent>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'first baseline', gap: 2, justifyContent: 'space-between'}}>
                          <Typography variant='h6'>{corso.titolo}</Typography>
                          {corso.nuovo && <Chip color='primary' label='Novità' size='small' sx={{ml: 2}} />}
                        </Box>
                        <Typography variant='body2'>{corso.descrizione}</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, my: 2, flexWrap: 'wrap'}}>
                          {corso.specialita.map(specialita => (
                            <Chip label={specialita} />
                          ))}
                        </Box>
                          <Chip color='primary' label={`${corso.anni[0]} - ${corso.anni[corso.anni.length - 1]} anno`} />
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
          ))}
        </Box>
    </div>
  );
}

export default App;
