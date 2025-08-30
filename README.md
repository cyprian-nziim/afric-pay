# AfricPay

A modern Angular application for managing payments with a clean, responsive UI and internationalization support.

## 📋 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or Yarn (v1.22 or later)
- Angular CLI (v20 or later)
- Git (for version control)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/cyprian-nziim/afric-pay.git
cd afric-pay
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Configure Environment

Copy the environment example file and update with your configuration:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edit the `environment.ts` file with your specific configuration.

## 🛠 Development

### Start Development Server

```bash
ng serve --open
```

Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

### Build for Production

```bash
npm run launch
```

The build artifacts will be stored in the `dist/afric-pay` directory.

## 🐳 Docker Support

### Development with Hot Reload

```bash
docker-compose up app-dev
```

### Production Build

```bash
docker-compose up app-prod
```

Access the production build at `http://localhost:80`

## 🧪 Testing

### Unit Tests

```bash
ng test
```

### End-to-End Tests

```bash
ng e2e
```

## 🧩 Development Tools

### Generate Components

Generate a new component:

```bash
ng generate component component-name
```

### Available Schematics

To see all available schematics:

```bash
ng generate --help
```

## 🌍 Internationalization (i18n)

The application supports multiple languages. To add a new language:

1. Add translation files in `src/assets/i18n/`
2. Update the language configuration in the application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Style Guide](https://angular.io/guide/styleguide)
