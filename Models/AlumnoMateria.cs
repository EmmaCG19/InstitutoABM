namespace IntranetInstituto.Models
{
    public class AlumnoMateria
    {
        public int NroLegajo { get; set; }
        public int CodMateria { get; set; }
        public byte NotaPrimerTrimestre { get; set; }
        public byte NotaSegundoTrimestre { get; set; }
        public byte NotaTercerTrimestre { get; set; }
        public virtual Alumno Alumno { get; set; }
        public virtual Materia Materia { get; set; } 
    }
}