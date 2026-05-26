using BrokenBlogApi.Services;
var builder = WebApplication.CreateBuilder(args);



builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<PostsService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Replace with your frontend's origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();
// Use CORS
app.UseCors("AllowFrontend");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapControllers();


app.Run();


