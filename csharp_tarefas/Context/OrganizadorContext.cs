using Microsoft.EntityFrameworkCore;
using tarefas.Models;

namespace tarefas.Context;

public class OrganizadorContext : DbContext
{
    public OrganizadorContext(DbContextOptions<OrganizadorContext> options) : base(options) { }

    public DbSet<Tarefa> Tarefas { get; set; }
}
