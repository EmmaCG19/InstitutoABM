USE InstitutoDB;	
GO

--RESET TABLES or USE DELETE + CHECK DBCC('table', RESEED, 0)
DELETE FROM CarrerasMaterias
DELETE FROM Inscripciones
DELETE FROM Cursos
DELETE FROM Alumnos
DELETE FROM Profesores
DELETE FROM Materias
DELETE FROM Carreras
GO

--RESEED TABLES
DBCC CHECKIDENT(N'Alumnos', RESEED, 0);
DBCC CHECKIDENT(N'Profesores', RESEED, 0);
DBCC CHECKIDENT(N'Materias', RESEED, 0);
DBCC CHECKIDENT(N'Cursos', RESEED, 0);
DBCC CHECKIDENT(N'Carreras', RESEED, 0);

--CARRERA
INSERT INTO Carreras(Nombre) VALUES(N'Desarrollo de Software') 
INSERT INTO Carreras(Nombre) VALUES(N'Infraestructura de Redes')
INSERT INTO Carreras(Nombre) VALUES(N'Analisis de Sistemas')
GO

--MATERIAS
INSERT INTO Materias(Nombre, Precio, EsPromocionable) VALUES(N'Matematica I', 1200,0) --1
INSERT INTO Materias(Nombre, Precio, EsPromocionable) VALUES(N'Programacion I', 4500,0) 
INSERT INTO Materias(Nombre, Precio, EsPromocionable) VALUES(N'Filosofia', 1500,1) 
INSERT INTO Materias(Nombre, Precio, EsPromocionable) VALUES(N'Redes', 3200,1)
-- INSERT INTO Materias(Nombre) VALUES(N'Sistemas Operativos') --2
-- INSERT INTO Materias(Nombre) VALUES(N'Probabilidad y Estadistica') --5
-- INSERT INTO Materias(Nombre) VALUES(N'Arquitectura de las computadoras') --6
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

--ALUMNOS
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Emmanuel', N'Fernandez', N'06/15/1994', 38396359, N'1123456789',1,N'03/12/2018', N'emmanuel.fernandez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Nahuel', N'Ferreira', N'06/16/1994', 38721003, N'1123456789',1,N'03/12/2018', N'nahuel.ferreira@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Lucas', N'Rodriguez', N'05/17/1993', 36892333, NULL,2,N'03/12/2019', N'lucas.rodriguez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Solange', N'Perez', N'04/18/1993', 37212892, N'1123456789',3,N'03/12/2020', N'sol.perez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Contacto, CodCarrera,FechaIngreso,Email) 
VALUES(N'Julieta', N'Estevez', N'03/19/1992', 3621348, NULL ,3,N'03/12/2020', N'julis.estevez@gmail.com') 
GO

--PROFESORES
INSERT INTO Profesores(Nombre, Apellido, FechaDeNacimiento, NroDocumento, Contacto, Email, CodMateria) 
VALUES
	(N'Profesor', N'Uno', N'1994-08-16', 12345671, N'1138459921',N'profeUno@gmail.com', 1),
	(N'Profesor', N'Dos', N'1990-09-19', 12345672, NULL,N'profeDos@gmail.com', 2),
	(N'Profesor', N'Tres', N'1885-10-01', 12345673, N'1138459921',N'profeTres@gmail.com', 3),
	(N'Profesor', N'Cuatro', N'1889-12-05', 12345674, N'1138459921',N'profeCuatro@gmail.com', 1)
GO

--CURSOS
INSERT INTO Cursos(ProfesorId, FechaInicio, FechaFin, Capacidad) 
VALUES 
	(1,N'2020-03-19',N'2020-07-03', 20),
	(2,N'2020-03-19',N'2020-07-03', 20),
	(3,N'2020-03-22',N'2020-07-03', 15),
	(4,N'2020-03-20',N'2020-07-03', 20)
GO

--INSCRIPCIONES
INSERT INTO Inscripciones
	(NroLegajo,CodCurso,FechaInscripcion) 
VALUES
	(1,1,N'2020-03-11'),
	(2,2,N'2020-03-11'),
	(3,4,N'2020-03-11'),
	(4,2,N'2020-03-11'),
	(5,1,N'2020-03-11')
GO


--SELECT * FROM Carreras;
--SELECT * FROM Materias;
--SELECT * FROM CarrerasMaterias;
--SELECT * FROM Profesores;
--SELECT * FROM Alumnos;
--SELECT * FROM Cursos;
--SELECT * FROM Inscripciones;
--SELECT * FROM __EFMigrationsHistory
--GO
