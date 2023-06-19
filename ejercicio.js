class TicketManager {
    
    #precioBaseGanacia = 0.15;
    constructor () {
        this.eventos = [];
    }
    getEventos = () => {
        return this.eventos;

    }

    agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) => {
        const evento = {
            id: this.eventos.length == 0 ? 1 : this.eventos[this.eventos.length - 1].id + 1,
            nombre,
            lugar, 
            precio: precio + (precio*this.#precioBaseGanacia),
            capacidad,
            fecha,
            participantes: []
        }
        this.eventos.push(evento)
        return evento;


    }
    agregarUsuario (idEvent, idUsuario) {
        const eventoIndex = this.eventos.findIndex((evento) => evento.id === idEvent)
        const evento = this.eventos[eventoIndex]
        if(eventoIndex === -1) {
            return "Evento no exite!";
        }
        if(evento.participantes.includes(idUsuario)){
            return "Usuario Registrado";
        }
        this.eventos[eventoIndex].participantes.push(idUsuario);
    }
    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const participanteFn = (participante) => {};
        const eventoFn = (evento) => {
          return evento.participantes.map(participanteFn);
        };

        const eventoIndex = this.eventos.map(eventoFn);
        if (eventoIndex === -1) {
            console.log("Evento no encontrado");
            return;
        }
        const evento = this.eventos[eventoIndex];
        const newEvento = {
            ...evento,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            id: this.eventyos.length == 0 ? 1 : this.eventos[this.eventos.length - 1].id + 1,
            participantes: [],
        };
        this.eventos.push(newEvento);
    }
}


/* db("user").then((usuario) => {
    db("curso", {where: {student: usuario.id} }).then((curso) => {
        db("notas", {where: {curso: curso.id} }).then((notas) => {
            console.log(notas);
        });
    });
}); */


const eventos = new TicketManager();
eventos.agregarEvento("Evento", "teatro", 10, 200);
eventos.agregarEvento("Evento 1", "teatro", 100);
eventos.agregarEvento("Evento 2", "teatro", 20, 200);
eventos.agregarUsuario(2, 4);
eventos.agregarUsuario(3, 2);
eventos.ponerEventoEnGira(2, "coliseo", new Date().toLocaleTimeString());
console.log(eventos.getEventos());