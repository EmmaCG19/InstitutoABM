namespace IntranetInstituto.Models
{
    public class CursoProfesor
    {
        public int CodCurso { get; set; }
        public int ProfesorId { get; set; }
        public virtual Curso Curso { get; set; }
        public virtual Profesor Profesor { get; set; }
    }
}