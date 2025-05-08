import { Search } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Card, CardContent, CardMedia, Chip, Container, InputAdornment, Slider, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';
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
              options={data.map(base => ({label: base.nome, value: base.nome}))}
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
            <Typography variant="body1">
              Il <strong>Tecnicamp</strong> è un’Attività Nazionale della Branca <strong>Esploratori ed Esploratrici</strong>: sviluppato in più basi scout in tutta Italia, permette ad esploratrici ed esploratori di migliorare la propria conoscenza delle tecniche scout e di sperimentarne di nuove.
              <br />
              Edizione 2025: <strong>6 basi</strong> Tecnicamp lungo tutto il territorio italiano, sempre più strutturate nelle proposte e nelle tecniche per cercare di arrivare a tutti e tutte. Inoltre da quest’anno, le nostre basi saranno caratterizzate da un nome che sia per loro unico ed evocativo, con un pizzico di tecnica ma anche di sogni, aiutandoci a dare ulteriore <strong>slancio</strong> a questo fantastico evento nazionale: soffiano i <strong>Venti</strong> dell’avventura!
              <br />
              Da quale vi lascerete rapire?
            </Typography>
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
