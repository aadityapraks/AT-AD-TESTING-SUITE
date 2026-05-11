const fs = require('fs');
const path = require('path');

class ReadableReporter {
  constructor(options = {}) {
    this.options = options;
  }

  onBegin(config, suite) {
    // Optional: Initialize reporter
  }

  onTestEnd(test, result) {
    // Only process failed tests
    if (result.status !== 'failed') return;

    // Process each attachment
    result.attachments.forEach((attachment) => {
      if (attachment.name === 'screenshot' && attachment.path) {
        this.processErrorContext(test, result, attachment.path);
      }
    });
  }

  processErrorContext(test, result, screenshotPath) {
    const testResultDir = path.dirname(screenshotPath);
    const errorContextPath = path.join(testResultDir, 'error-context.md');
    
    if (!fs.existsSync(errorContextPath)) return;

    try {
      const content = fs.readFileSync(errorContextPath, 'utf8');
      const readableContent = this.convertToReadableFormat(content, test, result);
      
      // Create readable version
      const readableContextPath = path.join(testResultDir, 'readable-error-context.md');
      fs.writeFileSync(readableContextPath, readableContent);
      
      console.log(`📝 Readable error context created: ${readableContextPath}`);
    } catch (error) {
      console.error('Error processing error context:', error);
    }
  }

  convertToReadableFormat(content, test, result) {
    let readable = `# Test Failure Analysis\n\n`;
    readable += `**Test:** ${test.title}\n`;
    readable += `**File:** ${test.location?.file || 'Unknown'}\n`;
    readable += `**Status:** ${result.status}\n`;
    readable += `**Duration:** ${result.duration}ms\n\n`;

    if (result.error) {
      readable += `## Error Details\n\n`;
      readable += `**Error:** ${result.error.message}\n\n`;
      if (result.error.stack) {
        readable += `**Stack Trace:**\n\`\`\`\n${result.error.stack}\n\`\`\`\n\n`;
      }
    }

    // Find and convert page snapshot
    const snapshotMatch = content.match(/# Page snapshot\s*```yaml\s*([\s\S]*?)\s*```/);
    if (snapshotMatch) {
      const yamlContent = snapshotMatch[1];
      readable += `## Page State When Error Occurred\n\n`;
      readable += this.convertYamlToReadable(yamlContent);
    }

    return readable;
  }

  convertYamlToReadable(yamlContent) {
    const lines = yamlContent.split('\n');
    let readable = '';
    let elementCount = 0;
    
    readable += `The page contained the following elements:\n\n`;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const indent = line.match(/^(\s*)/)?.[1]?.length || 0;
      const level = Math.floor(indent / 2);

      // Parse different element types
      if (trimmed.includes('[ref=')) {
        elementCount++;
        const element = this.parseElement(trimmed);
        const prefix = '  '.repeat(level) + '• ';
        readable += `${prefix}${element}\n`;
      }
    });

    readable += `\n**Total Elements Found:** ${elementCount}\n\n`;
    return readable;
  }

  parseElement(elementLine) {
    // Extract element type, text content, and attributes
    const refMatch = elementLine.match(/\[ref=([^\]]+)\]/);
    const ref = refMatch ? refMatch[1] : 'unknown';

    // Parse element type and content
    if (elementLine.includes('heading')) {
      const levelMatch = elementLine.match(/\[level=(\d+)\]/);
      const level = levelMatch ? levelMatch[1] : 'unknown';
      const textMatch = elementLine.match(/heading\s+"([^"]+)"/);
      const text = textMatch ? textMatch[1] : 'No text';
      return `**Heading (H${level}):** "${text}" (ID: ${ref})`;
    }
    
    if (elementLine.includes('button')) {
      const textMatch = elementLine.match(/button\s+"([^"]+)"/);
      const text = textMatch ? textMatch[1] : 'No text';
      const disabled = elementLine.includes('[disabled]') ? ' (disabled)' : '';
      const clickable = elementLine.includes('[cursor=pointer]') ? ' (clickable)' : '';
      return `**Button:** "${text}"${disabled}${clickable} (ID: ${ref})`;
    }
    
    if (elementLine.includes('link')) {
      const textMatch = elementLine.match(/link\s+"([^"]+)"/);
      const text = textMatch ? textMatch[1] : 'No text';
      const urlMatch = elementLine.match(/\/url:\s*([^\s]+)/);
      const url = urlMatch ? ` → ${urlMatch[1]}` : '';
      return `**Link:** "${text}"${url} (ID: ${ref})`;
    }
    
    if (elementLine.includes('textbox')) {
      const textMatch = elementLine.match(/textbox\s+"([^"]+)"/);
      const placeholder = textMatch ? textMatch[1] : 'No placeholder';
      return `**Text Input:** Placeholder: "${placeholder}" (ID: ${ref})`;
    }
    
    if (elementLine.includes('img')) {
      const altMatch = elementLine.match(/img\s+"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'No alt text';
      return `**Image:** Alt text: "${alt}" (ID: ${ref})`;
    }
    
    if (elementLine.includes('paragraph')) {
      const textMatch = elementLine.match(/paragraph\s+\[ref=[^\]]+\]:\s*(.+)/);
      const text = textMatch ? textMatch[1] : 'No text';
      return `**Paragraph:** "${text}" (ID: ${ref})`;
    }
    
    if (elementLine.includes('navigation')) {
      return `**Navigation Menu** (ID: ${ref})`;
    }
    
    if (elementLine.includes('generic')) {
      const textMatch = elementLine.match(/generic\s+\[ref=[^\]]+\]:\s*(.+)/);
      const text = textMatch ? ` containing "${textMatch[1]}"` : '';
      return `**Container/Div**${text} (ID: ${ref})`;
    }
    
    // Default case
    const typeMatch = elementLine.match(/^-?\s*(\w+)/);
    const type = typeMatch ? typeMatch[1] : 'unknown';
    return `**${type.charAt(0).toUpperCase() + type.slice(1)}** (ID: ${ref})`;
  }

  onEnd(result) {
    // Optional: Cleanup or summary
  }
}

module.exports = ReadableReporter;