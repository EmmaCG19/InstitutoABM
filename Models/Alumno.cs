using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Alumno : Persona
    {
        [Key]
        public int NroLegajo { get; set; }

        [Required]
        public DateTime FechaIngreso { get; set; }

        public int CodCarrera { get; set; }
        public Carrera Carrera { get; set; }

        public ICollection<Inscripcion> Inscripciones { get; set; }
    }
}