namespace IntranetInstituto.Models
{
    public class EspecialidadMateria
    {
        public int CodEspecialidad { get; set; }
        public int CodMateria { get; set; }

        public Especialidad Especialidad { get; set; }
        public Materia Materia { get; set; }
    }
}