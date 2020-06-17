namespace IntranetInstituto.Models
{
    public class EspecialidadMateria
    {
        public int CodEspecialidad { get; set; }
        public int CodMateria { get; set; }

        public virtual Especialidad Especialidad { get; set; }
        public virtual Materia Materia { get; set; }
    }
}