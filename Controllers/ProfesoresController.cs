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
    public class ProfesoresController : ControllerBase
    {
        public ActionResult<Profesor> GetProfesores()
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                List<Profesor> profesores = context.Profesores
                                                    .Include("Materia")
                                                    .ToList<Profesor>();

                return Ok(profesores);
            }
        }

        [Route("{profesorId:int:min(1)}")]
        public ActionResult<Profesor> GetProfesor(int profesorId)
        {

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Profesor profesorEncontrado = context.Profesores.Find(profesorId);

                if (profesorEncontrado is null)
                    return NotFound();
                else
                    return Ok(profesorEncontrado);
            }
        }

        [HttpPost]
        public IActionResult CargarProfesor(Profesor profesor)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                try
                {
                    context.Profesores.Add(profesor);
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    return NotFound(e.InnerException.InnerException.Message);
                }

                return Ok("El docente fue cargado exitosamente");
            }

        }

        [HttpPut]
        [Route("{profesorId:int:min(1)}")]
        public IActionResult ActualizarProfesor(int profesorId, Profesor profesor)
        {
            if (ModelState.IsValid)
            {
                //Condicion particular
                if (profesorId != profesor.ProfesorId)
                    ModelState.AddModelError("IdInvalida", "No coincide el id con el profesor a actualizar");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Profesor profesorAActualizar = context.Profesores.Find(profesorId);

                if (profesorAActualizar is null)
                    return NotFound();
                else
                {
                    #region Actualizando Profesor
                    profesorAActualizar.Nombre = profesor.Nombre;
                    profesorAActualizar.Apellido = profesor.Apellido;
                    profesorAActualizar.NroDocumento = profesor.NroDocumento;
                    profesorAActualizar.Direccion = profesor.Direccion;
                    profesorAActualizar.Email = profesor.Email;
                    profesorAActualizar.FechaDeNacimiento = profesor.FechaDeNacimiento;
                    profesorAActualizar.CodMateria = profesor.CodMateria;
                    #endregion

                    context.SaveChanges();
                    return Ok($"Se han actualizado los datos del docente con id: {profesorAActualizar.ProfesorId}");
                }
            }
        }

        [Route("profesorId:int:min(1)")]
        public IActionResult DeleteProfesor(int profesorId)
        {
            using (InstitutoDBContext context = new InstitutoDBContext())
            {
                Profesor profesorAEliminar = context.Profesores.Find(profesorId);

                if(profesorAEliminar is null)
                    return NotFound();
                else
                {
                    context.Profesores.Remove(profesorAEliminar);
                    context.SaveChanges();
                    return Ok("El docente pudo ser eliminado");    
                }
            }

        }
    }
}
