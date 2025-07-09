let work_button = true;

//id_pj1, id_pj2, fecha, lugar_id, ganador_id

function vote_char_1()
{
    if(work_button === true)
    {
        const personaje1 = window.pj1;
        const personaje2 = window.pj2;
        const fecha = new Date().toISOString();
        const lugar = window.lugar;
        const ganador_id = window.pj1;
        console.log('HOLA');
        fetch('/api/votaciones/');
    }
}