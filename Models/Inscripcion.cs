using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    [Table("Inscripciones")]
    public class Inscripcion
    {
        public int CodMateria { get; set; }
        public Materia Materia { get; set; }

        public int NroLegajo { get; set; }
        public Alumno Alumno { get; set; }

        [Required]
        public DateTime FechaInscripcion { get; set; }

        [Required]
        public bool Pagado { get; set; }
    }
}