using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Curso
    {
        public int CodCurso { get; set; }
        public string Nombre { get; set; }
        public byte Nivel { get; set; }
        public byte Cupos { get; set; }
        public int CodEspecialidad { get; set; }
        public virtual Especialidad Especialidad { get; set; }
        public virtual ICollection<Profesor> Profesores { get; set; }
        public virtual ICollection<Alumno> Alumnos { get; set; }
    }
}