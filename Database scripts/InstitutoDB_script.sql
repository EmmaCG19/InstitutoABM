USE InstitutoDB
GO

--SEED DATABASE TABLES

--RESET TABLES
DELETE FROM Alumnos
DELETE FROM Materias
DELETE FROM Cursos
DELETE FROM CodMateria
-- DELETE FROM Profesores

--RESEED THE IDENTITY COLUMN
DBCC CHECKIDENT ('Alumnos', RESEED, 0)  
DBCC CHECKIDENT ('Materias', RESEED, 0)  
DBCC CHECKIDENT ('Cursos', RESEED, 0)  
DBCC CHECKIDENT ('Carreras', RESEED, 0)  
-- DBCC CHECKIDENT ('Profesores', RESEED, 0)  
  

--CARRERA
INSERT INTO Carreras(Nombre) VALUES(N'Desarrollo de Software') 
INSERT INTO Carreras(Nombre) VALUES(N'Infraestructura de Redes')
INSERT INTO Carreras(Nombre) VALUES(N'Analisis de Sistemas')
GO

--MATERIAS
INSERT INTO Materias(Nombre) VALUES(N'Matematica I') --1
INSERT INTO Materias(Nombre) VALUES(N'Programacion I') 
INSERT INTO Materias(Nombre) VALUES(N'Filosofia') 
INSERT INTO Materias(Nombre) VALUES(N'Redes')
-- INSERT INTO Materias(Nombre) VALUES(N'Sistemas Operativos') --2
-- INSERT INTO Materias(Nombre) VALUES(N'Probabilidad y Estadistica') --5
-- INSERT INTO Materias(Nombre) VALUES(N'Arquitectura de las computadoras') --6
GO

--PROFESORES
-- INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Contacto, CodMateria, Email, FechaDeNacimiento) VALUES(N'Maria',N'Estevez',32121982,N'1123456789',1 ,N'estevez.maria@gmail.com', N'01/01/1991') 
-- INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Contacto, CodMateria, Email, FechaDeNacimiento) VALUES(N'Osvaldo',N'Laport',23121701,N'1123456789',2 ,N'osvalaport@gmail.com',N'02/12/1985') 
-- INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Contacto, CodMateria, Email, FechaDeNacimiento) VALUES(N'Franco',N'Segovai',37502312,N'1123456789',3 ,N'fran.segovia@gmail.com',N'06/15/1994') 
-- INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Contacto, CodMateria, Email, FechaDeNacimiento) VALUES(N'Lorena',N'Tropano',30232101,N'1123456789',4 ,N'loretropano@gmail.com',N'11/19/1990') 
-- GO

-- --CURSOS
-- INSERT INTO Cursos(ProfesorId, FechaInicio) VALUES(1,N'03/15/2020') 
-- INSERT INTO Cursos(ProfesorId, FechaInicio) VALUES(2,N'03/22/2020') 
-- INSERT INTO Cursos(ProfesorId, FechaInicio) VALUES(3,N'04/01/2020') 
-- INSERT INTO Cursos(ProfesorId, FechaInicio) VALUES(4,N'03/18/2020') 
GO

--ALUMNOS
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Emmanuel', N'Fernandez', N'06/15/1994', 38396359, N'1123456789',1,N'03/12/2018', N'emmanuel.fernandez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Nahuel', N'Ferreira', N'06/16/1994', 38721003, N'1123456789',1,N'03/12/2018', N'nahuel.ferreira@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Lucas', N'Rodriguez', N'05/17/1993', 36892333, N'1123456789',2,N'03/12/2019', N'lucas.rodriguez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Solange', N'Perez', N'04/18/1993', 37212892, N'1123456789',3,N'03/12/2020', N'sol.perez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Julieta', N'Estevez', N'03/19/1992', 3621348, null ,3,N'03/12/2020', N'julis.estevez@gmail.com') 
GO


--CARRERAS-MATERIAS
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(1,1)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(1,2)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(1,3)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(2,4)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(2,1)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(3,2)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(3,3)
INSERT INTO CarrerasMaterias(CodCarrera, CodMateria) VALUES(3,1)
GO

--CURSOS
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(1,1,N'03/15/2020',N'05/15/2020')
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(1,2,N'03/18/2020', N'07/15/2020')
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(2,2,N'03/11/2020', N'07/15/2020')
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(3,4,N'03/20/2020', N'07/12/2020')
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(4,2,N'03/12/2020', N'07/15/2020')
INSERT INTO Cursos(NroLegajo, CodMateria, FechaInicio, FechaFin) VALUES(5,1,N'03/14/2020', N'05/15/2020')
GO

 --SELECT * FROM Alumnos
 --SELECT * FROM Materias
 --SELECT * FROM Carreras
 --SELECT * FROM Profesores
 --SELECT * FROM Cursos
 --SELECT * FROM CarrerasMaterias
 --SELECT * FROM Cursos

