using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class CarreraMateria
    {
        public int CodCarrera { get; set; }
        public Carrera Carrera { get; set; }

        public int CodMateria { get; set; }
        public Materia Materia { get; set; }
        
    }
}