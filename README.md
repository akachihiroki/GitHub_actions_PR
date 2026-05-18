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

## 重要: PR必須 + CI失敗時に`master`へ反映させない設定（最新UI）

現在のGitHubでは、`Rulesets`（ルールセット）で設定する方法が推奨です。

1. Settings > Rules > Rulesets > New ruleset > New branch ruleset
2. Ruleset nameは任意（例: `protect-master`）
3. Enforcement statusを `Active` に設定
4. Target branches: `Include default branch` または patternに `master`
5. Rule `Require a pull request before merging` を有効化
6. Rule `Require status checks to pass before merging` を有効化
7. Required checksに `ci` を追加
8. 必要なら bypassを最小化（例: 管理者も対象にする）

この設定で、PRのCIが失敗している場合は`master`へマージできません。

補足:
- Required checksの名前は通常「ジョブ名」です。このリポジトリは workflow内のjobが `ci` なので、`ci` を指定します。
- 旧UIの `Settings > Branches > Branch protection rules` でも同等設定は可能ですが、今後はRulesets運用が分かりやすいです。
