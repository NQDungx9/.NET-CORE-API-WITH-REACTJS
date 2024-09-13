# .NET-CORE-API-WITH-REACTJS
So if this kind of thing happen
warning: LF will be replaced by CRLF in react-net/.gitignore.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/README.md.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/package-lock.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/package.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/public/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/public/manifest.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in react-net/public/robots.txt.

you just need to change
LF (Line Feed): Dùng trên hệ thống Unix/Linux (bao gồm cả macOS).
CRLF (Carriage Return + Line Feed): Dùng trên hệ điều hành Windows.
by using: git config --global core.autocrlf true

