using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Curso
    {
        [Key]
        public int CodCurso { get; set; }

        public int ProfesorId { get; set; }
        public Profesor Profesor { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }

        [Required]
        public DateTime FechaFin { get; set; }

        [Required]
        public byte Capacidad { get; set; }

        public ICollection<Inscripcion> Inscripciones { get; set; }
    }
}