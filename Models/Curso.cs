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
        public string Nombre { get; set; }
        public string Nivel { get; set; }
        public byte Capacidad { get; set; }

        [ForeignKey("Especialidad")]
        public int CodEspecialidad { get; set; }

        public   Especialidad Especialidad { get; set; }
        public   ICollection<Profesor> Profesores { get; set; }
        public   ICollection<Alumno> Alumnos { get; set; }
    }
}