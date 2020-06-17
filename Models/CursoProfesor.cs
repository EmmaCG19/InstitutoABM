namespace IntranetInstituto.Models
{
    public class CursoProfesor
    {
        public int CodCurso { get; set; }
        public int ProfesorId { get; set; }
        public Curso Curso { get; set; }
        public Profesor Profesor { get; set; }
    }
}