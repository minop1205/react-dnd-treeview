# React DnD TreeView <br> development guide

## Branching

### Main Branches
メインブランチに寿命はなく、レポジトリには常に `stable` と `master` の２つのブランチが存在します。 

|Instance|Branch|Description, Instructions, Notes|
|---|---|---|
|Stable|stable|Accepts merges from Working and Hotfixes|
|Working|master|Accepts merges from Features/Issues and Hotfixes|

#### master
次のリリースに向けての開発最新版ブランチ。開発時は `master` からのブランチ作成や `master` へのマージが主なワークフローとなります。  
`master` は直接編集することはせず、masterから派生したブランチのマージにより更新されます。

#### stable
本番にデプロイされた最新のコード用ブランチ。日々の開発では、`stable` ブランチとのやりとりは発生しない。  
`master` ブランチのソースコードが安定版でデプロイされた場合、すべての変更は `stable` にマージされ、リリース番号をタグ付けします。

### Supporting Branches
サポートブランチは、チームメンバー間の並行開発を支援し、機能の追跡を容易にし、本番での問題を迅速に解決するために使用されます。  
メインブランチとは異なり、これらのブランチの寿命は常に限られています。

これらのブランチにはそれぞれ特定の目的があり、ソースブランチとターゲットブランチが明確に定められています。

|Instance|Branch|Format|Source|Target|Description, Instructions, Notes|
|---|---|---|---|---|---|
|Features/Issues|feature <br> bug|feature-{issue number} <br> bug-{issue number}|master|master|Always branch off HEAD of Working|
|Hotfix|hotfix|hotfix-{issue number}|stable|stable and master|Always branch off Stable|

#### feature
`feature` ブランチは、新機能や機能拡張を開発する場合に使用します。開発を開始するときに、この機能がリリースされるデプロイメントがわからない場合があります。機能ブランチがいつ終了するかにかかわらず、機能ブランチは常に `master` ブランチにマージされます。

`master` ブランチへのマージ時に発生し得る競合を処理するコストを減らすために、`feature` ブランチの開発中に行われた `master` ブランチへの変更は、随時 `feature` ブランチへ取り込む（マージする）ようにします。

ブランチがまだ存在しない場合は、ローカルでブランチを作成してから GitHub にプッシュします。  
`feature` ブランチは常に「公開」されていなければなりません。つまり、開発者のローカルブランチだけではなく、リモートにもブランチが存在しなくてはならないということです。

定期的に、`master` に加えられた変更 (もしあれば) は、`feature` ブランチにマージされるべきです。

`feature` ブランチの開発が完了したら、変更を `master` ブランチにマージし、リモートブランチを削除します。

#### bug
`bug` ブランチは `feature` ブランチとは意味的にのみ異なります。  
`bug` ブランチは、次のデプロイメントにマージすべき不具合の対応を行うために作成されます。そのため、`bug` ブランチは通常 1 回のデプロイメントサイクルより長くは続かないでしょう。
`bug` ブランチはバグ修正と機能開発の違いを明確に追跡するために使用されます。`bug` ブランチはいつ終了するかに関わらず、常にマスターにマージされます。

`master` ブランチへのマージ時に発生し得る競合を処理するコストを減らすために、`bug` ブランチの開発中に行われた `master` ブランチへの変更は、随時 `bug` ブランチへ取り込む（マージする）ようにします。

##### Working with a bug branch
ブランチがまだ存在しない場合は、ローカルでブランチを作成してから GitHub にプッシュします。  
`bug` ブランチは常に「公開」されていなければなりません。つまり、開発者のローカルブランチだけではなく、リモートにもブランチが存在しなくてはならないということです。

```
$ git checkout -b bug-id master                     // creates a local branch for the new bug
$ git push origin bug-id                            // makes the new bug remotely available
```

定期的に、`master` に加えられた変更 (もしあれば) は `bug` ブランチにマージされるべきです。

```
$ git merge master                                  // merges changes from master into bug branch
```

`bug` ブランチの開発が完了したら、変更を `master` ブランチにマージし、リモートブランチを削除します。

```
$ git switch master                               // change to the master branch  
$ git merge --no-ff bug-id                          // makes sure to create a commit object during merge
$ git push origin master                            // push merge changes
$ git push origin :bug-id                           // deletes the remote branch
```

#### hotfix
本番デプロイされたコードに不具合が見つかり、（予めスケジューリングされた次のデプロイメントを待たずに）すぐに対処する必要がある場合は `hotfix` ブランチを作成して対応します。  
`hotfix` ブランチは常にタグ付けされた安定版ブランチから分岐します。  
緊急性が高いため、まず運用中のバージョンである `stable` に対し `hotfix` をマージした後に、修正を次のデプロイメントにも反映させるために `master` にもマージしておきます。

##### Working with a hotfix branch
ブランチがまだ存在しない場合は、ローカルでブランチを作成してから GitHub にプッシュします。  
`hotfix` ブランチは常に「公開」されていなければなりません。つまり、開発者のローカルブランチだけではなく、リモートにもブランチが存在しなくてはならないということです。

```
$ git checkout -b hotfix-id stable                  // creates a local branch for the new hotfix
$ git push origin hotfix-id                         // makes the new hotfix remotely available
```

`hotfix` の開発が完了したら、変更を `stable` にマージしてからタグを更新します。

```
$ git switch stable                                 // change to the stable branch
$ git merge --no-ff hotfix-id                       // forces creation of commit object during merge
$ git tag -a <tag>                                  // tags the fix
$ git push origin stable --tags                     // push tag changes
```

変更を `master` にもマージして `hotfix` を失わないようにし、リモートの `hotfix` ブランチを削除します。

```
$ git switch master                                 // change to the master branch
$ git merge --no-ff hotfix-id                       // forces creation of commit object during merge
$ git push origin master                            // push merge changes
$ git push origin :hotfix-id                        // deletes the remote branch
```

### Source
https://gist.github.com/digitaljhelms/4287848


## Conventional Commits
コミットメッセージのバリデーションには `commitlint` ( https://github.com/conventional-changelog/commitlint ) を使用しています。  
またコミットメッセージは次の規約に準拠します。  
https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional


### Format
コミットメッセージのフォーマットは次の通りです。

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

`type`, `subject` は必須です。`body`, `footer` を入れる場合はそれぞれ空行を間に挿みます。


#### type
`type` は lowerCase で表記し、次のいずれかの指定が必須です。  

| name | description |
| --- | ---|
| build | ビルド |
| ci | CI |
| chore | 雑事（カテゴライズする必要ないようなもの） |
| docs | ドキュメント |
| feat | 新機能 |
| fix | バグフィックス |
| perf | パフォーマンス |
| refactor | リファクタリング |
| revert | コミット取り消し（git revert） |
| style | コードスタイル修正 |
| test | テスト |

```
: some message     # fails
foo: some message  # fails
FIX: some message  # fails
fix: some message  # passes
```

#### scope
`type` には追加のコンテキスト情報を表す `scope` を含むことが出来ます。  
`scope` は `type` の後に括弧付きで表し、lowerCase で表記します。

```
fix(SCOPE): some message  # fails
fix(scope): some message  # passes
```

#### subject
`subject` は必須であり、命令形・現在系の動詞から始めます（例：'changed' や 'changes' ではなく 'change' から始まります）。  
コミットメッセージは「何をしたか」を記録するというよりも、「このコミットを適用するとどうなるか」を示す方が望ましいためです。

`subject` は lowerCase で表記します。

```
fix:               # fails
fix: Some Message  # fails
fix: SomeMessage   # fails
fix: SOMEMESSAGE   # fails
fix: some message  # passes
```

`subject` の末尾を `.` で終わらせてはなりません。

```
fix: some message. # fails
fix: some message  # passes
```

#### body
`subject` の詳細情報が必要な場合は `body` セクションに記述してください。

```
fix: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12
```

#### footer
`footer` には、Breaking Changes についての情報や、このコミットがクローズした GitHub の課題を参照する場所でもあります。

Breaking Changes は、最初に `BREAKING CHANGE:` という単語で始まり、スペースか改行で始まります。

破壊的な変更は全て `footer` の `BREAKING CHANGE` ブロックとして記載しなければなりません。  
`BREAKING CHANGE` ブロックには、変更の説明、変更理由、移行の注意事項などを記載します。

```
BREAKING CHANGE: isolate scope bindings definition has changed and
  the inject option for the directive controller injection was removed.
  
  To migrate the code follow the example below:
  
  Before:
  
  scope: {
    myAttr: 'attribute',
    myBind: 'bind',
    myExpression: 'expression',
    myEval: 'evaluate',
    myAccessor: 'accessor'
  }
  
  After:
  
  scope: {
    myAttr: '@',
    myBind: '@',
    myExpression: '&',
    // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
    myAccessor: '=' // in directive's template change myAccessor() to myAccessor
  }
  
  The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```


クローズしたGitHub Issueへの参照を追加する場合、次のように `Closes` キーワードを先頭にして記述してください。

```
Closes #234
```

複数のIssueへの参照を追加するには、カンマ区切りで記述します。

```
Closes #123, #245, #992
```


#### BREAKING CHANGE
オプションの本文やフッターセクションの最初に `BREAKING CHANGE:` というテキストを持つコミットは、互換性の無い破壊的な変更を含むことを表します。  
`BREAKING CHANGE` は、どのようなタイプのコミットにも含まれる可能性があります。

```
fix: some message

BREAKING CHANGE: It will be significant
```

### 他参考文献
- @commitlint/config-conventional  
https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional

- Conventional Commits  
https://www.conventionalcommits.org/en/v1.0.0-beta.4/

- Angular Commit Message Conventions  
https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

- Writing Git commit messages  
https://365git.tumblr.com/post/3308646748/writing-git-commit-messages
