using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Materia
    {
        [Key]
        public int CodMateria { get; set; }
        [Required]
        public string Nombre { get; set; }

        public ICollection<Profesor> Profesores { get; set; }
        public ICollection<EspecialidadMateria> EspecialidadMaterias { get; set; }
        public ICollection<AlumnoMateria> AlumnoMaterias { get; set; }
    }
}