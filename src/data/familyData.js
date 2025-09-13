export const familia = {
  miembros: [
    { 
      id: 'm1', 
      nombre: 'Carlos Pérez', 
      edad: 48, 
      genero: 'M', 
      rol: 'Padre', 
      salud: {peso: 85, altura: 1.75, presion: 130, glucosa: 110, colesterol: 190},
      historial: [
        { 
          fecha: '2023-10-15', 
          tipo: 'consulta', 
          motivo: 'Control anual', 
          diagnostico: 'Hipertensión leve', 
          tratamiento: 'Dieta baja en sal y ejercicio' 
        },
        { 
          fecha: '2023-05-20', 
          tipo: 'consulta', 
          motivo: 'Dolor de espalda', 
          diagnostico: 'Contractura muscular', 
          tratamiento: 'Antiinflamatorios y fisioterapia' 
        }
      ],
      examenes: [
        { 
          fecha: '2023-10-10', 
          tipo: 'sangre', 
          glucosa: 110, 
          colesterol: 190, 
          trigliceridos: 150 
        },
        { 
          fecha: '2023-04-05', 
          tipo: 'orina', 
          resultado: 'Normal', 
          observaciones: 'Sin hallazgos relevantes' 
        }
      ]
    },
    { 
      id: 'm2', 
      nombre: 'María Gómez', 
      edad: 45, 
      genero: 'F', 
      rol: 'Madre', 
      salud: {peso: 70, altura: 1.62, presion: 120, glucosa: 90, colesterol: 170},
      historial: [
        { 
          fecha: '2023-09-10', 
          tipo: 'consulta', 
          motivo: 'Control ginecológico', 
          diagnostico: 'Normal', 
          tratamiento: 'Control anual' 
        }
      ],
      examenes: [
        { 
          fecha: '2023-09-05', 
          tipo: 'sangre', 
          glucosa: 90, 
          colesterol: 170, 
          trigliceridos: 120 
        },
        { 
          fecha: '2023-09-05', 
          tipo: 'mamografía', 
          resultado: 'Normal', 
          observaciones: 'Sin hallazgos' 
        }
      ]
    },
    { 
      id: 'm3', 
      nombre: 'Sofía Pérez', 
      edad: 17, 
      genero: 'F', 
      rol: 'Hija', 
      salud: {peso: 55, altura: 1.65, presion: 110, glucosa: 85, colesterol: 150},
      historial: [
        { 
          fecha: '2023-08-25', 
          tipo: 'consulta', 
          motivo: 'Control adolescente', 
          diagnostico: 'Salud óptima', 
          tratamiento: 'Continuar con hábitos saludables' 
        }
      ],
      examenes: [
        { 
          fecha: '2023-08-20', 
          tipo: 'sangre', 
          glucosa: 85, 
          colesterol: 150, 
          trigliceridos: 100 
        }
      ]
    },
    { 
      id: 'm4', 
      nombre: 'Diego Pérez', 
      edad: 14, 
      genero: 'M', 
      rol: 'Hijo', 
      salud: {peso: 60, altura: 1.70, presion: 115, glucosa: 88, colesterol: 160},
      historial: [
        { 
          fecha: '2023-07-15', 
          tipo: 'consulta', 
          motivo: 'Control pediátrico', 
          diagnostico: 'Crecimiento normal', 
          tratamiento: 'Alimentación balanceada' 
        }
      ],
      examenes: [
        { 
          fecha: '2023-07-10', 
          tipo: 'sangre', 
          glucosa: 88, 
          colesterol: 160, 
          trigliceridos: 110 
        }
      ]
    },
    { 
      id: 'm5', 
      nombre: 'Ana Rodríguez', 
      edad: 72, 
      genero: 'F', 
      rol: 'Abuela', 
      salud: {peso: 68, altura: 1.60, presion: 140, glucosa: 130, colesterol: 210},
      historial: [
        { 
          fecha: '2023-10-05', 
          tipo: 'consulta', 
          motivo: 'Control geriátrico', 
          diagnostico: 'Diabetes tipo 2', 
          tratamiento: 'Metformina 500mg 2 veces al día' 
        },
        { 
          fecha: '2023-06-12', 
          tipo: 'consulta', 
          motivo: 'Dolor articular', 
          diagnostico: 'Artrosis', 
          tratamiento: 'Analgésicos y fisioterapia' 
        }
      ],
      examenes: [
        { 
          fecha: '2023-10-01', 
          tipo: 'sangre', 
          glucosa: 130, 
          colesterol: 210, 
          trigliceridos: 180 
        },
        { 
          fecha: '2023-06-10', 
          tipo: 'densitometría', 
          resultado: 'Osteopenia', 
          observaciones: 'Suplementación con calcio y vitamina D' 
        }
      ]
    }
  ],
  relaciones: {
    name: "Familia Pérez Gómez",
    children: [
      {
        name: "Carlos Pérez",
        id: "m1",
        spouse: "m2",
        children: [
          { name: "Sofía Pérez", id: "m3" },
          { name: "Diego Pérez", id: "m4" }
        ]
      },
      {
        name: "María Gómez",
        id: "m2",
        spouse: "m1",
        children: [
          { name: "Sofía Pérez", id: "m3" },
          { name: "Diego Pérez", id: "m4" }
        ]
      },
      {
        name: "Ana Rodríguez",
        id: "m5"
      }
    ]
  }
};

// Helper functions for health calculations
export const getHealthStatus = (member) => {
  const { presion, glucosa, colesterol } = member.salud;
  let riskFactors = 0;
  
  if (presion > 130) riskFactors++;
  if (glucosa > 110) riskFactors++;
  if (colesterol > 200) riskFactors++;
  
  if (riskFactors === 0) return "Óptimo";
  if (riskFactors === 1) return "Moderado";
  return "Requiere atención";
};

export const getHealthClass = (healthStatus) => {
  switch(healthStatus) {
    case "Óptimo": return "bg-success";
    case "Moderado": return "bg-warning text-dark";
    case "Requiere atención": return "bg-danger";
    default: return "bg-secondary";
  }
};

export const getHealthColor = (member) => {
  const healthStatus = getHealthStatus(member);
  switch(healthStatus) {
    case "Óptimo": return "#4caf50";
    case "Moderado": return "#ff9800";
    case "Requiere atención": return "#f44336";
    default: return "#9e9e9e";
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
};

export const getExamTypeName = (type) => {
  const types = {
    'sangre': 'Análisis de Sangre',
    'orina': 'Análisis de Orina',
    'mamografía': 'Mamografía',
    'densitometría': 'Densitometría Ósea'
  };
  return types[type] || type;
};