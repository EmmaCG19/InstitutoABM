using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Profesor : Persona
    {
        public int ProfesorId { get; set; }

        [ForeignKey("Materia")]
        public int CodMateria { get; set; }
        public Materia Materia { get; set; }

        public ICollection<Curso> Cursos { get; set; }       
    }
}