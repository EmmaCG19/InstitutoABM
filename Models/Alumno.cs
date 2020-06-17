using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Alumno: Persona
    {
        [Key]
        public int NroLegajo { get; set; }
        public DateTime FechaDeIngreso { get; set; }

        [ForeignKey("Curso")]
        public int CodCurso {get;set;}

        public   Curso Curso{get;set;}
        public   ICollection<AlumnoMateria> AlumnoMaterias { get; set; }
    }
}