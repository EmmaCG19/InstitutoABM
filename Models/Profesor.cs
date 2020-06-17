using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Profesor:Persona
    {
        public int ProfesorId { get; set; }
        public int CodMateria { get; set; }
        public virtual Materia Materia { get; set; }
        public virtual ICollection<Curso> Cursos { get; set; }
    }
}