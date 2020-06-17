using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntranetInstituto.Models;

namespace IntranetInstituto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        public ActionResult<Curso> GetCursos()
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                List<Curso> cursos = context.Cursos
                                                    .Include("Especialidad")
                                                    .ToList<Curso>();

                return Ok(cursos);
            }
        }

        [Route("{codCurso:int:min(1)}")]
        public ActionResult<Curso> GetCurso(int codCurso)
        {

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Curso cursoEncontrado = context.Cursos.Find(codCurso);

                if (cursoEncontrado is null)
                    return NotFound();
                else
                    return Ok(cursoEncontrado);
            }
        }

        [HttpPost]
        public IActionResult CargarCurso(Curso curso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                try
                {
                    context.Cursos.Add(curso);
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    return NotFound(e.InnerException.Message);
                }

                return Ok("El curso fue cargado exitosamente");
            }

        }

        [HttpPut]
        [Route("{codCurso:int:min(1)}")]
        public IActionResult ActualizarCurso(int codCurso, Curso curso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Curso cursoAActualizar = context.Cursos.Find(codCurso);

                if (cursoAActualizar is null)
                    return NotFound();
                else
                {
                    #region Actualizando curso
                    cursoAActualizar.CodEspecialidad = curso.CodEspecialidad;
                    cursoAActualizar.Nombre= curso.Nombre;
                    cursoAActualizar.Capacidad= curso.Capacidad;
                    cursoAActualizar.Nivel = curso.Nivel ;
                    #endregion

                    context.SaveChanges();
                    return Ok($"Se han actualizado los datos del curso con codigo: {cursoAActualizar.CodCurso}");
                }
            }
        }

        [Route("codCurso:int:min(1)")]
        public IActionResult DeleteCurso(int codCurso)
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Curso cursoAEliminar = context.Cursos.Find(codCurso);

                if(cursoAEliminar is null)
                    return NotFound();
                else
                {

                    context.Cursos.Remove(cursoAEliminar);
                    context.SaveChanges();
                    return Ok("El curso pudo ser eliminado");
                }
            }

        }
    }
}
