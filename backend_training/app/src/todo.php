<?php

/**
 * `/todos` エンドポイントを処理します。
 *
 * @param PDO $pdo データベース接続のためのPDOインスタンス
 * @return void
 */
function handleGetTodos(PDO $pdo): void
{
    try {
        // データベースからTodoリストを取得
        $stmt = $pdo->query("SELECT todos.id, todos.title, statuses.name FROM todos JOIN statuses ON todos.status_id = statuses.id;");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // レスポンスを返却
        echo json_encode(['status' => 'ok', 'data' => $result]);
    } catch (Exception $e) {
        // クエリエラー時のレスポンス
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to get todos',
            'error' => $e->getMessage()
        ]);
    }
    exit;
}

function handleGetTodosbyId(PDO $pdo, $id): void
{
    try {
        // データベースからTodoリストを取得
        $stmt = $pdo->prepare("SELECT todos.id, todos.title, statuses.name FROM todos JOIN statuses ON todos.status_id = statuses.id WHERE todos.id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
		$stmt->execute();

        // 結果を取得
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // 結果が空の場合は404エラーを返す
        if (empty($result)){
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Todoが見つかりません',
            ]);
            exit;}else{
                // レスポンスを返却
                echo json_encode(['status' => 'ok', 'data' => [$result]]);
            }
    } catch (Exception $e) {
        // クエリエラー時のレスポンス
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to get todos',
            'error' => $e->getMessage()
        ]);
    }
    exit;
}