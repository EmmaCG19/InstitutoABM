using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Persona
    {
        public string Nombre { get; set; }        
        public string Apellido { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public int NroDocumento { get; set; }
        public string Direccion { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }   
    }
}