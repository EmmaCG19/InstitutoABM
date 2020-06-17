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
    public class AlumnosController : ControllerBase
    {
        public ActionResult<Alumno> GetAlumnos()
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                List<Alumno> alumnos = context.Alumnos
                                                    .Include("Curso")
                                                    .ToList<Alumno>();

                return Ok(alumnos);
            }
        }

        [Route("{nroLegajo:int}")]
        public ActionResult<Alumno> GetAlumno(int nroLegajo)
        {

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Alumno alumnoEncontrado = context.Alumnos.Find(nroLegajo);

                if (alumnoEncontrado is null)
                    return NotFound();
                else
                    return Ok(alumnoEncontrado);
            }
        }

        [HttpPost]
        public IActionResult CargarAlumno(Alumno alumno)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                try
                {
                    context.Alumnos.Add(alumno);
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    return NotFound(e.InnerException.Message);
                }

                return Ok("El alumno fue cargado exitosamente");
            }

        }

        [HttpPut]
        [Route("{nroLegajo:int}")]
        public IActionResult ActualizarAlumno(int nroLegajo, Alumno alumno)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Alumno alumnoAActualizar = context.Alumnos.Find(nroLegajo);

                if (alumnoAActualizar is null)
                    return NotFound();
                else
                {
                    #region Actualizando alumno
                    alumnoAActualizar.Nombre = alumno.Nombre;
                    alumnoAActualizar.Apellido = alumno.Apellido;
                    alumnoAActualizar.NroDocumento = alumno.NroDocumento;
                    alumnoAActualizar.Direccion = alumno.Direccion;
                    alumnoAActualizar.Email = alumno.Email;
                    alumnoAActualizar.CodCurso = alumno.CodCurso;
                    alumnoAActualizar.FechaDeNacimiento = alumno.FechaDeNacimiento;
                    alumnoAActualizar.FechaDeIngreso = alumno.FechaDeIngreso;
                    #endregion

                    context.SaveChanges();
                    return Ok($"Se han actualizado los datos del alumno con legajo: {alumnoAActualizar.NroLegajo}");
                }
            }
        }

        public IActionResult DeleteAlumno(int nroLegajo)
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Alumno alumnoAEliminar = context.Alumnos.Find(nroLegajo);

                if(alumnoAEliminar is null)
                    return NotFound();
                else
                {
                    context.Alumnos.Remove(alumnoAEliminar);
                    context.SaveChanges();
                    return Ok("El alumno pudo ser eliminado");
                }
            }

        }
    }
}



