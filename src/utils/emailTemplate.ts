export const otpTemplate = (otp: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Full Stack App</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            margin-bottom: 10px;
        }
        .otp {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Full Stack App 👻</h1>
        <p>Dear User,</p>
        <p>Thank you for joining the Daraz App! We're excited to have you on board.</p>
        <p>To complete your registration, use the following OTP (One-Time Password):</p>
        <div class="otp-container">
            <span class="otp">Your OTP: <strong>${otp}</strong></span>
        </div>
        <p>This OTP is valid for a short period, so please use it promptly.</p>
        <p>Enjoy shopping with Daraz App!</p>
        <p>Best regards,<br>Daraz Team</p>
    </div>
</body>
</html>
`;

export const usersStatsTemplate = (users: number, admins: number, verifiedUsers: number, unverifiedUsers: number): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Statistics - Full Stack App</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            margin-bottom: 10px;
        }
        .stats-container {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 15px;
        }
        .stat-box {
            background-color: #4caf50;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 18px;
            width: 120px;
            margin: 5px;
        }
        .stat-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-value {
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Statistics - Full Stack App 👻</h1>
        <p>Dear Admin,</p>
        <p>Here are the current statistics of users on the Full Stack App:</p>
        <div class="stats-container">
            <div class="stats">
                <div class="stat-box">
                    <p class="stat-title">Users</p>
                    <p class="stat-value">${users}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-title">Admins</p>
                    <p class="stat-value">${admins}</p>
                </div>
            </div>

            <div class="stats">
                <div class="stat-box">
                    <p class="stat-title">Verified Users</p>
                    <p class="stat-value">${verifiedUsers}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-title">Unverified Users</p>
                    <p class="stat-value">${unverifiedUsers}</p>
                </div>
            </div>
        </div>

        <p>This information will help you keep track of the users' data on the platform.</p>
        <p>Best regards,<br>Daraz Team</p>
    </div>
</body>
</html>
`;