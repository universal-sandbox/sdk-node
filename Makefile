.PHONY: build publish release

# Path to the shared VERSION file
VERSION_FILE := ../universal-sandbox/VERSION

# Build distribution packages
build:
	@echo "Cleaning build artifacts..."
	@rm -rf dist/ node_modules/.cache/
	@echo "Syncing version from $(VERSION_FILE)..."
	@VERSION=$$(cat $(VERSION_FILE) | tr -d '\n'); \
	node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); pkg.version = '$$VERSION'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
	@echo "✓ Version synced to $$(cat $(VERSION_FILE) | tr -d '\n')"
	@echo "Building distribution packages..."
	@npm run build
	@echo "✓ Built packages:"
	@ls -lh dist/

# Publish to npm
publish: build
	@echo "Publishing to npm..."
	@npm publish --access public

# Alias for publish (for consistency across projects)
release: publish
