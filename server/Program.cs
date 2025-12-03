using Microsoft.EntityFrameworkCore;

// Crea el builder de la aplicación
var builder = WebApplication.CreateBuilder(args);

// Política de CORS para conectar con Angular
var MyCorsPolicy = "AllowAngular";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyCorsPolicy, policy =>
    {
        var corsOrigin = builder.Configuration["AllowedCorsOrigins"]!;
        policy.WithOrigins(corsOrigin) // Permite frontend Angular
              .AllowAnyHeader()       // Permite cualquier cabecera
              .AllowAnyMethod();      // Permite cualquier método HTTP
    });
});

// Configura conexión a SQL Server con EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Habilita documentación OpenAPI/Swagger
builder.Services.AddOpenApi();

var app = builder.Build();

// Aplica política de CORS
app.UseCors(MyCorsPolicy);

// Habilita OpenAPI solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Redirige HTTP a HTTPS
app.UseHttpsRedirection();

// Ejecuta la aplicación
app.Run();


