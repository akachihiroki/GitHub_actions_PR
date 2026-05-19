const result = document.getElementById("result");
const sum = 2 + 3;

if (result) {
  result.innerHTML = `2 + 3 = <strong>${sum}</strong> をあ表示しています。<br />CI/CD確認用変更: 2026-05-18。<br />このページはGitHub Actionsでbuild後にデプロイされます。`;
}
