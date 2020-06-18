USE InstitutoDB
GO

--SEED DATABASE TABLES

--CARRERA
INSERT INTO Carrera(Nombre) VALUES(N'Desarrollo de Software') 
INSERT INTO Carrera(Nombre) VALUES(N'Infraestructura de Redes')
INSERT INTO Carrera(Nombre) VALUES(N'Analisis de Sistemas')
GO

--MATERIAS
INSERT INTO Materias(Nombre) VALUES(N'Matematica I') --1
INSERT INTO Materias(Nombre) VALUES(N'Sistemas Operativos') --2
INSERT INTO Materias(Nombre) VALUES(N'Programacion I') --3
INSERT INTO Materias(Nombre) VALUES(N'Filosofia') --4
INSERT INTO Materias(Nombre) VALUES(N'Probabilidad y Estadistica') --5
INSERT INTO Materias(Nombre) VALUES(N'Arquitectura de las computadoras') --6
INSERT INTO Materias(Nombre) VALUES(N'Redes')
GO

--CURSOS
INSERT INTO Cursos(Nombre, Nivel, Capacidad, CodEspecialidad) VALUES(N'Info I', 1, 30, 1) 

GO

--PROFESORES
INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Direccion, CodMateria, Email, FechaDeNacimiento) VALUES(N'Maria',N'Estevez',32121982,N'Calle template 8998',4 ,N'estevez.maria@gmail.com', N'01/01/1991') 
INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Direccion, CodMateria, Email, FechaDeNacimiento) VALUES(N'Osvaldo',N'Laport',23121701,N'',2 ,N'osvalaport@gmail.com',N'02/12/1985') 
INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Direccion, CodMateria, Email, FechaDeNacimiento) VALUES(N'Franco',N'Segovai',37502312,N'Calle template 1234',6 ,N'fran.segovia@gmail.com',N'06/15/1994') 
INSERT INTO Profesores(Nombre, Apellido, NroDocumento, Direccion, CodMateria, Email, FechaDeNacimiento) VALUES(N'Lorena',N'Tropano',30232101,N'Calle template 5678',5 ,N'loretropano@gmail.com',N'11/19/1990') 
GO

--ALUMNOS
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Direccion, CodCurso,FechaDeIngreso,Email) 
VALUES(N'Emmanuel', N'Fernandez', N'06/15/1994', 38396359, N'Calle template 123',1,N'03/12/2012', N'emmanuel.fernandez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Direccion, CodCurso,FechaDeIngreso,Email) 
VALUES(N'Nahuel', N'Ferreira', N'06/16/1994', 38721003, N'Calle template 222',1,N'03/12/2012', N'nahuel.ferreira@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Direccion, CodCurso,FechaDeIngreso,Email) 
VALUES(N'Lucas', N'Rodriguez', N'05/17/1993', 36892333, N'Calle template 333',2,N'03/12/2011', N'lucas.rodriguez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Direccion, CodCurso,FechaDeIngreso,Email) 
VALUES(N'Solange', N'Perez', N'04/18/1993', 37212892, N'Calle template 444',3,N'03/12/2011', N'sol.perez@gmail.com') 
INSERT INTO Alumnos(Nombre, Apellido, FechaDeNacimiento, NroDocumento,Direccion, CodCurso,FechaDeIngreso,Email) 
VALUES(N'Julieta', N'Estevez', N'03/19/1992', 3621348, N'Calle template 555',4,N'03/12/2010', N'julis.estevez@gmail.com') 
GO

--ALUMNOS-MATERIAS
INSERT INTO AlumnosMaterias(NroLegajo, CodMateria, NotaPrimerTrimestre,NotaSegundoTrimestre, NotaTercerTrimestre) VALUES(1,1,7,6,7)
INSERT INTO AlumnosMaterias(NroLegajo, CodMateria, NotaPrimerTrimestre,NotaSegundoTrimestre, NotaTercerTrimestre) VALUES(1,4,10,9,10)
INSERT INTO AlumnosMaterias(NroLegajo, CodMateria, NotaPrimerTrimestre,NotaSegundoTrimestre, NotaTercerTrimestre) VALUES(2,4,8,9,7)
INSERT INTO AlumnosMaterias(NroLegajo, CodMateria, NotaPrimerTrimestre,NotaSegundoTrimestre, NotaTercerTrimestre) VALUES(4,6,5,7,9)
INSERT INTO AlumnosMaterias(NroLegajo, CodMateria, NotaPrimerTrimestre,NotaSegundoTrimestre, NotaTercerTrimestre) VALUES(4,7,6,6,6)
GO



--CURSOS-PROFESORES
INSERT INTO CursosProfesores(CodCurso, ProfesorId) VALUES(1,2)
INSERT INTO CursosProfesores(CodCurso, ProfesorId) VALUES(1,1)
INSERT INTO CursosProfesores(CodCurso, ProfesorId) VALUES(2,1)
INSERT INTO CursosProfesores(CodCurso, ProfesorId) VALUES(4,4)
GO

--ESPECIALIDAD-MATERIAS
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(1,1)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(1,2)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(1,4)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(2,4)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(2,6)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(3,5)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(3,1)
INSERT INTO EspecialidadesMaterias(CodEspecialidad, CodMateria) VALUES(3,4)
GO

SELECT * FROM Alumnos
SELECT * FROM Materias
SELECT * FROM Carrera
SELECT * FROM Profesores
SELECT * FROM Cursos