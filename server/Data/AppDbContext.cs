using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Tablas del sistema
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Mesa> Mesas { get; set; }
    public DbSet<Reserva> Reservas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Reserva → Usuario (usando FirebaseUid como clave principal)
        modelBuilder.Entity<Reserva>()
            .HasOne<Usuario>()                        // Una reserva pertenece a un usuario
            .WithMany()                               // Un usuario puede tener varias reservas
            .HasForeignKey(r => r.UsuarioFirebaseUid) // FK en Reserva
            .HasPrincipalKey(u => u.FirebaseUid);     // PK alterna en Usuario

        // Reserva → Mesa
        modelBuilder.Entity<Reserva>()
            .HasOne<Mesa>()                           // Una reserva tiene una mesa
            .WithMany()                               // Una mesa puede tener varias reservas
            .HasForeignKey(r => r.MesaId);            // FK en Reserva
    }
}
