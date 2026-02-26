<?php
$token = 'Y8337692290:AAEqofEyRobwMYOp5qfJOiQxoPV4GMZw7TI';
$update = file_get_contents("php://input");
$updateArray = json_decode($update, true);

if (!isset($updateArray['message'])) exit;

$chat_id = $updateArray['message']['chat']['id'];
$text = $updateArray['message']['text'] ?? '';

if (strpos($text, '/start') === 0) {
    $data = [
        'chat_id' => $chat_id,
        'text' => "Привет, " . ($updateArray['message']['from']['first_name'] ?? 'друг') . "! 👋\nОткрой мини-апп:",
        'reply_markup' => json_encode([
            'inline_keyboard' => [
                [['text' => 'Открыть мини-апп', 'url' => 'https://life-tracker-one-zeta.vercel.app']]
            ]
        ])
    ];

    $url = "https://api.telegram.org/bot$token/sendMessage";
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];

    $context  = stream_context_create($options);
    file_get_contents($url, false, $context);
}
?>