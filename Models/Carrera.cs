using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Carrera
    {
        [Key]
        public int CodCarrera { get; set; }

        [Required]
        public string Nombre { get; set; }

        public ICollection<Alumno> Alumnos { get; set; }
        public ICollection<CarreraMateria> CarrerasMaterias { get; set; }
    }
}