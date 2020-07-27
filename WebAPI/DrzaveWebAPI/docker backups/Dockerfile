#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS build
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0
WORKDIR /src
COPY ["DrzaveWebAPI/DrzaveWebAPI.csproj", "DrzaveWebAPI/"]
COPY ["BLL/BLL.csproj", "BLL/"]
COPY ["DAL/DAL.csproj", "DAL/"]
COPY ["DALHelpers/DALHelpers.csproj", "DALHelpers/"]
COPY ["Entities/Entities.csproj", "Entities/"]
RUN dotnet restore "DrzaveWebAPI/"
COPY . .
WORKDIR /src/
RUN dotnet publish "DrzaveWebAPI/DrzaveWebAPI.csproj" -c Release -o /app

COPY --from=build /app .
WORKDIR /app


ENTRYPOINT ["dotnet", "DrzaveWebAPI.dll"]