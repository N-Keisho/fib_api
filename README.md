# フィボナッチ数を返す API サービス

クエリパラメータにて n を指定することで，第 n 項のフィボナッチ数列を返します．

## 使用技術

[Hono](https://hono.dev/) で実装し，[Cloudflare Works](https://www.cloudflare.com/ja-jp/plans/developer-platform/) にデプロイしました．選定理由としては以下になります．

1. Hono は Typescript をサポートしており，言語習得の難度が低いため
2. Hono はレスポンスが早いため
3. Hono は Cloudflare Works に簡単にデプロイできるため
4. Cloudflare Works は 1 日 10 万回のリクエストまでは無料で使えるため
5. Cloudflare を DNS サーバとして利用しているため
6. Hono は日本人が作った割と最近のフレームワークであり，以前から興味があったため

## 構成

`index.ts` でルーティングを設定し，api の動作は `fib/app.ts` に記述しています．

`fib/app.ts` は以下の流れで動作します．

1. クエリパラメータ n を受け取る
2. n についてのエラーハンドリングを行う
3. フィボナッチ数を計算する
4. 結果を返す

### 1. クエリパラメータの受け取り

Hono では以下の方法で簡単に受け取ることができます．

```typescript
const n = c.req.query('n');
```

### 2. エラーハンドリング

エラーハンドリングでは以下の場合にエラーを返すようにしています．

1. n がない場合
2. n が数字ではない場合
3. n が正の整数ではない場合
4. n が 1400 よりも大きい場合

具体的なレスポンスについては，下記"エラー事例"をご確認ください。
n が 1400 よりも大きい場合にエラーを返すのは，1400 を超えると `BigInt` でもオーバーフローしてしまい，誤差が生じるためです．

### 3. フィボナッチ数を計算する

フィボナッチ数を計算する際，桁数が非常に多くなるため，`number` ではオーバーフローしてしまいます．ゆえに `BigInt` を用いて大きな数字でも扱えるようにしています．

実装自体は，前から順番に足していくシンプルなプログラムになっています．n=1400でも0.1秒かからずレスポンスが返ってきます．
```typescript
let a = 0n, b = 1n;
for (let i = 2 ; i <= num; i++) {
    const temp = a + b;
    a = b;
    b = temp;
}
```
数字のあとに ```n``` をつけると ```number``` ではなく ```bigInt``` になります．

### 4. レスポンスを返す
レスポンスを返す際に，```BigInt``` を文字列 ```string``` に変換してレスポンスに入れています．これは ```BigInt``` の仕様上そのままJSONに入れることができないためです．ゆえに文字列としてレスポンスを返すこととしました．

## テスト

[vitest](https://vitest.dev/) によるユニットテストを用意しています．

### テスト内容

以下のテストを実施するようになっています．

1. n がない場合
2. n に何も指定していない場合
3. n に文字列を指定した場合
4. n が負の整数の場合
5. n が 0 の場合
6. n が 10 の場合
7. n が 99 の場合
8. n が 1401 の場合

### テスト手順

1. 任意のディレクトリにて，本リポジトリのクローンを作成します．

```powershell
$ git clone https://github.com/N-Keisho/fib-api.git
```

2. クローンしたディレクトリに移動します

```powershell
$ cd fib_api
```

3. 必要なパッケージをインストールします

```powershell
$ npm install
```

4. テストを実行します

```powershell
$ npm test
```

### 実行結果例

```powershell
> fib-api@0.0.0 test
> vitest --run

 RUN  v2.0.5

[vpw:inf] Starting isolated runtimes for vitest.config.mts...
 ✓ test/index.spec.ts (8)
   ✓ GET /fib (8)
     ✓ GET /fib
     ✓ GET /fib?n=
     ✓ GET /fib?n=abc
     ✓ GET /fib?n=-1
     ✓ GET /fib?n=0
     ✓ GET /fib?n=10
     ✓ GET /fib?n=99
     ✓ GET /fib?n=1401

 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  00:23:36
   Duration  1.61s (transform 39ms, setup 0ms, collect 72ms, tests 52ms, environment 0ms, prepare 246ms)

[vpw:dbg] Shutting down runtimes...
```

## リクエスト＆レスポンスの仕様

### HTTP メソッド

```
GET
```

### URL

```
https://fib-api.n-keisho.com/fib
```

### リクエスト例

```
https://fib-api.n-keisho.com/fib?n=50
```

### レスポンス例

```
{
    "result": 12586269025
}
```

### エラー事例

n が無い場合

```
{
	status: '400',
    message: 'n is required',
}
```

n が数ではない場合

```
{
    status: '400',
    message: 'n should be a number',
}
```

n が正の整数ではない場合

```
{
    status: '400',
    message: 'n should be a positive number',
}
```

n が 1400 よりも大きいとき

```
{
    status: '400',
    message: 'n should be less than 1400',
}
```

# 仕様技術リンク
[1] Hono. https://hono.dev/

[2] Cloudflare Works. https://www.cloudflare.com/ja-jp/plans/developer-platform/

[3] vitest. https://vitest.dev/

# 参考記事
[1] azukiazusa. "Hono + Cloudflare Workers で REST API を作ってみよう". Zenn. 2022-08-29. https://zenn.dev/azukiazusa/articles/hono-cloudflare-workers-rest-api, (参照 2024-10-20). 

[2] "Testing". Hono. 2024-10-18. https://hono.dev/docs/guides/testing, (参照 2024-10-20). 
