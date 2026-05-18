# GitHub Actions CI/CD Sample (PR Required)

このリポジトリは、PR必須 + CI成功時のみ`master`へ反映される運用を確認するためのサンプルです。

## 構成

- `src/math.js`: テスト対象の簡単な関数
- `test/math.test.js`: Node.js組み込みテスト
- `site/`: デプロイ対象の静的サイト
- `scripts/build.mjs`: `site` を `dist` にコピーするビルド
- `.github/workflows/test-actions.yml`: PR向けCI/CDワークフロー

## ローカル実行

```bash
npm install
npm test
npm run build
```

## ワークフローの動き

- featureブランチでPRを作成するとCI（install/test/build）を実行
- `master`へマージされたときのみPagesへデプロイ
- 自動revertは行わない

## 重要: PR必須 + CI失敗時に`master`へ反映させない設定

この挙動はGitHubのブランチ保護で実現します。以下を`master`に設定してください。

1. Settings > Branches > Add branch protection rule
2. Branch name pattern: `master`
3. `Require a pull request before merging` を有効化
4. `Require status checks to pass before merging` を有効化
5. Required checksに `ci` を追加
6. 必要なら `Do not allow bypassing the above settings` も有効化

この設定で、PRのCIが失敗している場合は`master`へマージできず、結果として`master`へのpushは行われません。
