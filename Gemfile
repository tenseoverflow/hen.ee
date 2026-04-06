source "https://rubygems.org"

gem "jekyll"
group :jekyll_plugins do
  gem "jekyll-feed"
  gem 'jekyll-paginate'
  gem 'jekyll-sitemap'
  gem 'jekyll-relative-links'
  gem 'jekyll-seo-tag'
end

# Windows problems
## Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo"
  gem "tzinfo-data"
end

## Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

## -serve
gem "webrick"
