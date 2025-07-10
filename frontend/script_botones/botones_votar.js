let work_button = true;

async function sendVote(id_pj1, id_pj2, fecha, lugar_id, ganador_id) {
  try {
    const response = await fetch('http://localhost:3000/api/votaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pj1, id_pj2, fecha, lugar_id, ganador_id }),
    });

    if (!response.ok)
        {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
    const data = await response.json();
    console.log('Voto registrado:', data);
  } catch (error) {
    console.error('Error en enviarVoto:', error);
  }
}




//id_pj1, id_pj2, fecha, lugar_id, ganador_id

async function vote_char_1()
{
    if(work_button === true)
    {
        work_button = false;
        const personaje1 = window.pj1;
        const personaje2 = window.pj2;
        const fecha = new Date().toISOString();
        const lugar = window.lugar;
        const ganador = window.pj1;
        await sendVote(personaje1, personaje2, fecha, lugar, ganador);
    }
    location.reload();
}

async function vote_char_2()
{
    if(work_button === true)
    {
        work_button = false;
        const personaje1 = window.pj1;
        const personaje2 = window.pj2;
        const fecha = new Date().toISOString();
        const lugar = window.lugar;
        const ganador = window.pj2;
        await sendVote(personaje1, personaje2, fecha, lugar, ganador);
    }
    location.reload();
}