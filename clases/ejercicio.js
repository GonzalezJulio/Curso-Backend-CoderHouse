import fs from "fs/promises";

class TicketManager {
  #precioBaseGanacia = 0.15;
  // *
  // [{id: 1}, {id: 2}, {id: 2}]
  constructor() {
    this.eventos = [];
  }

  getEventos = async () => {
    const file = await fs.readFile("./eventos.json", "utf8");
    const eventos = JSON.parse(file);
    return eventos;
  };
  //  =>
  // * [{id: 1}, {id: 2}, {id: 3}]
  // * [{id: 1}, {id: 3}, {id: 4}]
  agregarEvento = async (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString()
  ) => {
    try {
      const file = await fs.readFile("./eventos.json", "utf8");
      const eventos = JSON.parse(file);
      const evento = {
        id: eventos.length == 0 ? 1 : eventos[eventos.length - 1].id + 1,
        nombre,
        lugar,
        precio: precio + precio * this.#precioBaseGanacia,
        capacidad,
        fecha,
        participantes: [],
      };

      this.eventos = eventos;
      eventos.push(evento);
      await fs.writeFile("./eventos.json", JSON.stringify(eventos));
      return evento;
      // nombre
      // lugar
      // precio (deberá agregarse un 0.15 del valor original)
      // capacidad (50 por defecto)
      // fecha (hoy por defecto)
      // El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.
    } catch (e) {
      console.log(e);
    }
  };

  agregarUsuario(idEvent, idUsuario) {
    const eventoIndex = this.eventos.findIndex((event) => event.id === idEvent);
    const evento = this.eventos[eventoIndex];
    if (eventoIndex === -1) {
      return "Not found!";
    }

    if (evento.participantes.includes(idUsuario)) {
      return "Usuario registrado";
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
      id:
        this.eventos.length == 0
          ? 1
          : this.eventos[this.eventos.length - 1].id + 1,
      participantes: [],
    };
    this.eventos.push(newEvento);
  }
}

const eventos = new TicketManager();
eventos
  .agregarEvento("Evento", "teatro", 10, 200)
  .then(() => {
    eventos.agregarEvento("Evento 1", "teatro", 100).then(() => {
      eventos.agregarEvento("Evento 2", "teatro", 20, 200).then(() => {});
    });
  })
  .catch();
await eventos.agregarEvento("Evento 1", "teatro", 100);
await eventos.agregarEvento("Evento 2", "teatro", 20, 200);
// eventos.agregarUsuario(2, 4);
// eventos.agregarUsuario(3, 2);
// eventos.ponerEventoEnGira(2, "coliseo", new Date().toLocaleTimeString());
console.log(await eventos.getEventos());