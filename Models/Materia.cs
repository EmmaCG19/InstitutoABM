using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Materia
    {
        public int CodMateria { get; set; }
        public int Nombre { get; set; }
        public virtual ICollection<EspecialidadMateria> EspecialidadMaterias{get;set;}
        public virtual ICollection<Profesor> Profesores { get; set; }
        public virtual ICollection<AlumnoMateria> AlumnoMaterias { get; set; }
    }
}