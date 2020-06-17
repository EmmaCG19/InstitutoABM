using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Alumno: Persona
    {
        public int NroLegajo { get; set; }
        public DateTime FechaDeIngreso { get; set; }
        public int CodCurso {get;set;}

        public virtual Curso Curso{get;set;}
        public virtual ICollection<AlumnoMateria> AlumnoMaterias { get; set; }
    }
}