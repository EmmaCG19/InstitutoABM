using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    [Table("Inscripciones")]
    public class Inscripcion
    {
        public int CodCurso { get; set; }
        public Curso Curso { get; set; }

        public int NroLegajo { get; set; }
        public Alumno Alumno { get; set; }

        [Required]
        public byte NotaPrimerParcial{get;set;}

        [Required]
        public DateTime FechaPrimerParcial{get;set;}

        [Required]
        public byte NotaSegundoParcial{get;set;}

        [Required]
        public DateTime FechaSegundoParcial{get;set;}

        //Puede ser nulleable ya que la materia puede ser promocionable y no tener nota
        public byte? NotaFinal{get;set;}

        public DateTime? FechaFinal{get;set;}

        [Required]
        public DateTime FechaInscripcion { get; set; }
    }
}