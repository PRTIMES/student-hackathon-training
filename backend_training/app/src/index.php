<?php
require_once 'config.php'; // 設定ファイルを読み込み
require_once 'todo.php'; // エンドポイントの処理を記述したファイルを読み込み
// レスポンスのヘッダーを設定
// JSON形式で返すためのヘッダー
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

// Strip out query parameters by getting only the path
$requestUri = $_SERVER['REQUEST_URI']; // This strips out the query string

// Now $requestUri will only have the path, and no query parameters
global $pdo;

$routes = [
    'GET' => [
        '#^/todos$#' => 'handleGetTodos',  // Match only `/todos` with no query params or other path
        // todesのidを取得するエンドポイント
        '#^/todos/(\d+)$#' => 'handleGetTodosbyId',
        // healthエンドポイントを追加
        '#^/health$#' => 'handleHealthCheck',
    ],
    'POST' => [
        // TODO: 他のエンドポイントを追加
        '#^/todos$#' => 'handlePostTodos',

    ],
    'PUT' => [
        // TODO: 他のエンドポイントを追加
    ],
    'DELETE' => [
        // TODO: 他のエンドポイントを追加
    ]
];

// ルーティング処理
if (isset($routes[$method])) {
    foreach ($routes[$method] as $pattern => $handler) {
        if (preg_match($pattern, $requestUri, $matches)) {
            array_shift($matches);
            call_user_func_array($handler, array_merge([$pdo], $matches));
            exit;
        }
    }
}
// ルーティングが見つからない場合は404エラーを返す
http_response_code(404);
echo json_encode(['error' => 'Not Found']);
exit;

/**
 * `/health` エンドポイントを処理します。
 *
 * @param PDO $pdo データベース接続のためのPDOインスタンス
 * @return void
 */
function handleHealthCheck(PDO $pdo): void
{
    try {
        // データベース接続を確認
        $stmt = $pdo->query("SELECT 1");
        $result = $stmt->fetchColumn();

        if ($result == 1) {
            // データベース接続が正常の場合のレスポンス
            echo json_encode(['status' => 'ok', 'database' => 'connected']);
        } else {
            // データベース応答なしの場合のエラーレスポンス
            throw new RuntimeException('Database connection failed');
        }
    } catch (Exception $e) {
        // クエリエラー時のレスポンス
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Database connection failed',
            'error' => $e->getMessage()
        ]);
    }
    exit;
}
