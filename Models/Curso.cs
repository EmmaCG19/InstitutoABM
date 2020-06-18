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

        [ForeignKey("Profesor")]
        public int ProfesorId { get; set; }        
        public Profesor Profesor { get; set; }
        
        public DateTime FechaInicio { get; set; }

        public ICollection<AlumnoCurso> AlumnosCursos { get; set; }
    }
}